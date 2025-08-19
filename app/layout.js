import LenisScroll from "./components/LenisScroll";
import "./globals.css";

export const metadata = {
    title: "Mohammad Ullah Portfolio",
    description:
        "Welcome to my portfolio website showcasing my projects and skills.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased overflow-x-hidden`}>
                {children}
                <LenisScroll />
            </body>
        </html>
    );
}
