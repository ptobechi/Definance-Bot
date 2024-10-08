import Image from 'next/image'
import logo from "@/img/logo.svg"
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href='/' className="p-2 w-auto shrink-0 flex items-center">

            <div className="shrink-0">
                <Image
                    alt="Logo"
                    src={logo}
                    height={70}
                    width={70}
                  />
            </div>
            <div>
              <div className="text-2xl lowercase font-serif font-medium text-black">DefinanceBot</div>
            </div>
        </Link>
    )
}
export default Logo