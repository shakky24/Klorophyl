import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/fin_klo_die_symbol.png" 
                alt="Klorophyl Logo" 
                width={50} 
                height={50} 
                className="rounded-md"
              />
              <span className="font-bold text-2xl">Klorophyl</span>
            </div>
            <p className="text-green-100 mb-6">
              Crafting breathtaking green spaces for every home & business since 2013.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-green-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-green-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-green-100 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-green-100 hover:text-white transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-green-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-300 shrink-0 mt-0.5" />
                <span className="text-green-100">
                  329, 7th Main Rd
                  <br />
                  HAL 2nd Stage, Indiranagar
                  <br />
                  Bengaluru, Karnataka 560038
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-300 shrink-0" />
                <Link href="tel:+919886052525" className="text-green-100 hover:text-white transition-colors">
                  +91 7975448429
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-300 shrink-0" />
                <Link href="mailto:info@klorophyl.com" className="text-green-100 hover:text-white transition-colors">
                  info@klorophyl.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-12 pt-6 text-center text-green-100 text-sm">
          <p>&copy; {new Date().getFullYear()} Klorophyl. All rights reserved.</p>
          {/* <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
