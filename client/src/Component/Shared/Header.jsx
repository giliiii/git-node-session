import {NavLink, useNavigate} from "react-router-dom"
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';


 const Header = () => {
    const navigate = useNavigate()
    const items = [
         {disabled: true },
        {
            style:{ marginLeft: '0.5rem' },
            label: 'בית',
            icon: 'pi pi-home',
            command: () => {
                navigate('/');
            }
        },
        {disabled: true },{disabled: true },{disabled: true },
        {
            label: '       מוצרים ',
            icon: 'pi pi-star',
               command: () => {
                navigate('/all/product');
            }
        },
        {disabled: true },{disabled: true },{disabled: true },
        {
            label: 'To enter',
            icon: 'pi pi-search',
            items: [
                
                {
                    label: 'Login',
                    icon: 'pi pi-user',
                        command: () => {
                            navigate('/all/login');
                        }
                },
                {
                    label: 'Register',
                    icon: 'pi pi-server',
                        command: () => {
                            navigate('/all/register');
                        }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-pencil',
                        command: () => {
                            localStorage.removeItem("userToken")
                            navigate('/all/home')
                        }
                }
      
            ]
        },
        {disabled: true },{disabled: true },{disabled: true },
        {
            label:(
                <div className="card flex justify-content-center">
                    <Image src="/logoD.jpg" alt="Image" width="100" />
                </div>
            ),
             disabled: true 

        },
        {disabled: true },{disabled: true },{disabled: true },{disabled: true },{disabled: true },{disabled: true },
        {
            label: 'My shopping',
            icon: 'pi pi-shopping-cart',
               command: () => {
                navigate('/all/mybasket');
            }
        },
        {disabled: true },{disabled: true },{disabled: true },
        {
            label: 'מנהל',
            icon: 'pi pi-envelope',
                        command: () => {
                            navigate('/all/manager');
                        }
            
        }
    ];

    return (
        // <div style={{height:"10vh",backgroundColor:"#fbf4ec",position:"sticky", top:"0",zIndex:"100",padding:0}}>
            <Menubar  model={items} style={{height:"10vh",backgroundColor:"#fbf4ec",position:"sticky", top:"0",zIndex:"100",display:"flex",justifyContent:"start",padding:0,border:"none",color:"black"}}/>
        
    )

}

export default Header