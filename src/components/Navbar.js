import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext';
import $ from "jquery";
import "./Styles/navbar.css";

export default function Navbar() {
    let { currentUser, logOut } = useUserAuth();
    const navigate = useNavigate();
    const [sidebar, setSideBar] = useState(false);
    const [screenWidth, setScreenWidth] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // Effect to set loading state for auth buttons to load
    useEffect(() => {
        setTimeout(() => { setIsLoading(false) }, 500);
    }, []);

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
            console.log("Signed out successfully");
        } catch (error) {
            console.log(error);
        }
    }

    // Effect to add a resize event listener
    useEffect(() => {
        window.addEventListener('resize', windowWidth);
    })

    // Function to update screen width on window resize
    function windowWidth() {
        setScreenWidth(window.innerWidth);
    };

    function toggleSideBar() {
        if (screenWidth <= 768) {

            setSideBar(!sidebar);

            if (sidebar) {
                $("body").css("overflow-y", "hidden");
                document.getElementById("overlay").style.width = "100%";
                document.getElementById("top-nav").style.right = "0";

                document.getElementById("sidebar-toggler").classList.add("toggle-animation");
            } else {
                $("body").css("overflow-y", "auto");
                document.getElementById("overlay").style.width = "0px";
                document.getElementById("top-nav").style.right = "-350px";

                document.getElementById("sidebar-toggler").classList.remove("toggle-animation");
            }
        }
    }

    return (
        <>
            <nav id="navbar">
                <Link to="/" className="logo">
                    BookQuest
                </Link>

                <div id="top-nav" className="navbar-links">
                    <ul>
                        {isLoading ?
                            <>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </>
                            :
                            <>
                                <li>
                                    <Link to="/" onClick={() => { toggleSideBar() }}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/explore" onClick={() => { toggleSideBar() }}>
                                        Explore
                                    </Link>
                                </li>

                                {currentUser ?
                                    <>
                                        <li>
                                            <Link to="/mylog" onClick={() => { toggleSideBar() }}>
                                                My Log
                                            </Link>
                                        </li>
                                        <li>
                                            |
                                        </li>
                                        <li>
                                            <Link className="profile-btn" to="#" onClick={() => { toggleSideBar() }}>
                                                {currentUser.email ? currentUser.email : "...."}
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="logout-btn" onClick={() => { handleLogout() }}></button>
                                        </li>
                                    </>
                                    :
                                    <li>
                                        <button className="signup-btn" onClick={() => { navigate("/login"); toggleSideBar(); }}>
                                            Login
                                        </button>
                                    </li>
                                }
                            </>
                        }
                    </ul>
                </div>
            </nav>

            <button id="sidebar-toggler" className="toggle" title="sidebar toggle" onClick={() => { toggleSideBar() }}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div id="overlay" onClick={() => { toggleSideBar() }}></div>
        </>
    )
}