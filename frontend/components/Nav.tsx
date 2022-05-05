import React, {useState} from 'react';
import Link from 'next/link'



function Nav(){
    const [isActive, setIsActive] = useState(false)

    function handleMenuClick(){
        setIsActive(!isActive)
    }

    return (
    <nav className={`${isActive ? 'active' : ''}`}>
        <button className="btn-main-menu" onClick={handleMenuClick}>menu</button>
        <ul>
            <li>
                 <Link href="/works"> 
                    <a>test</a>
                  </Link> 
            </li>
            <li>B</li>
            <li>C</li>
        </ul>
    </nav>
    )
}

export default Nav;