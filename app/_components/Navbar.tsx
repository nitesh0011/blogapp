'use client'
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import Link from 'next/link';
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from '@nextui-org/button';
import { ThemeSwitcher } from './ThemeSwitcher';
const NavbarComponent = () => {
    const { user } = useKindeBrowserClient();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false)


    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",

    ];


    return (
        <>
            <div className="mx-auto max-w-5xl py-4 px-6">
                <Navbar onMenuOpenChange={setIsMenuOpen}>
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                        />
                        <Link href='/'>
                            <NavbarBrand className='text-2xl font-bold font-sans'>
                                CodeBlog
                                <p className="font-bold text-inherit text-purple-700">DEV</p>
                            </NavbarBrand>
                        </Link>
                    </NavbarContent>


                    <NavbarContent justify="end">
                        {user ? 
                        <div> <LogoutLink >Log out</LogoutLink> </div> :
                            <div className='flex items-center gap-3'>
                                <NavbarItem className="hidden lg:flex">
                                    <LoginLink>Sign in</LoginLink>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button as={Link} color="primary" href="#" variant="flat">
                                        <RegisterLink>Sign up</RegisterLink>
                                    </Button>
                                </NavbarItem>
                            </div>
                            
                            }
                        <NavbarItem className='hidden md:block'>

                            <Dropdown >
                                <DropdownTrigger>
                                    <Button
                                        variant="flat"
                                        color='primary'
                                    >
                                        setting
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions"  >
                                    <DropdownItem  >
                                        <ThemeSwitcher />
                                    </DropdownItem>

                                </DropdownMenu>
                            </Dropdown>


                        </NavbarItem>
                    </NavbarContent>
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link

                                    className="w-full dark:text-white light:text-black"
                                    href="#"

                                >
                                    {item}

                                </Link>
                            </NavbarMenuItem>
                        ))}
                        <div className='  w-24'>

                            <ThemeSwitcher />
                        </div>
                    </NavbarMenu>
                </Navbar>
            </div>
        </>
    )
}

export default NavbarComponent
