import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Format data for Supabase insert
    const { services, ...rest } = data;
    
    const formattedData = {
      full_name: rest.fullName,
      phone_number: rest.phoneNumber,
      email: rest.email || null,
      terrace_garden: services.terraceGarden || false,
      balcony_garden: services.balconyGarden || false,
      backyard_garden: services.backyardGarden || false,
      waterbodies: services.waterbodies || false,
      farmhouse_landscaping: services.farmhouseLandscaping || false,
      potted_plant_schemes: services.pottedPlantSchemes || false,
      area_size: rest.areaSize || null,
      budget_range: rest.budgetRange || null,
      design_preferences: rest.designPreferences || null,
    };

    // Insert into Supabase
    const { data: insertedData, error } = await supabase
      .from('contact_submissions')
      .insert([formattedData])
      .select();

    if (error) {
      console.error('Error submitting form:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: insertedData }, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
