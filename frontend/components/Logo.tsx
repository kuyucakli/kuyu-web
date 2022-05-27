import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface ILogo {
    uiThemeColor?: string
    uiThemeAmbientColor: string
}


const Logo = ({ uiThemeAmbientColor }: ILogo): JSX.Element => {

    const logoFile = `/logo_${uiThemeAmbientColor.includes('dark-ui') ? 'white' : 'black'}.svg`

    const logo = <Link href="/" >
        <a className="logo">
            <Image src={logoFile} alt="Burak Kuyucaklı logo" width={40} height={40} />
        </a>
    </Link>

    return logo

}

export default Logo