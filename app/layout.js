import Footer from "./components/Footer";
import LenisScroll from "./components/LenisScroll";
import ScrollToTopButton from "./components/ScrollToTopButton";
import "./globals.css";

export const metadata = {
    title: "Mohammad Ullah Portfolio",
    description:
        "Welcome to my portfolio website showcasing my projects and skills.",
    icons: {
        icon: "/favicon-v2.ico",
        shortcut: "/favicon-v2.ico",
        apple: "/favicon-v2.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased overflow-x-hidden`}>
                {children}
                <Footer />
                <LenisScroll />
                <ScrollToTopButton />
            </body>
        </html>
    );
}
