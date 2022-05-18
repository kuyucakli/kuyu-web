import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface ILogo {
    uiThemeColor?: string
    uiThemeAmbientColor: string
}


const Logo = ({ uiThemeAmbientColor }: ILogo): JSX.Element => {

    const logo = <Link href="/" >
        <a className="logo">
            <Image src={`/logo_${uiThemeAmbientColor === 'dark' ? 'white' : 'black'}.svg`} alt="Burak Kuyucaklı logo" width={40} height={40} />
        </a>
    </Link>

    return logo

}

export default Logo