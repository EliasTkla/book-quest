import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from './context/UserAuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyLog from './pages/MyLog';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Profile from './pages/Profile';
import Footer from './components/Footer';
import ErrorMessage from './components/ErrorMessage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <QueryClientProvider client={client}>
            <UserAuthContextProvider>
                <Router>
                    <ScrollToTop />
                    <Navbar />

                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/explore' element={<Explore />} />
                            <Route path='/mylog' element={
                                <ProtectedRoute>
                                    <MyLog />
                                </ProtectedRoute>
                            } />
                            <Route path='/bookdetail/:id' element={<BookDetail />} />
                            <Route path='/login' element={
                                <ProtectedRoute>
                                    <Login />
                                </ProtectedRoute>
                            } />
                            <Route path='/signup' element={
                                <ProtectedRoute>
                                    <Signup />
                                </ProtectedRoute>
                            } />
                            {/* <Route
                            path='/profile'
                            element={
                                <ProtectedRoute>
                                <Profile />
                                </ProtectedRoute>
                            }
                        /> */}
                            <Route path='*' element={<ErrorMessage pageError={"error"} />} />
                        </Routes>
                    </main>

                    <Footer />
                </Router>
            </UserAuthContextProvider>
        </QueryClientProvider>
    )
}
