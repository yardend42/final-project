import MainRoute from "../../Routes/mainRoute/mainRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./mainLayout.css";

function MainLayout(): JSX.Element {
    return (
        <div className="mainLayout">
			<header>
                <Header/>
            </header>
            <main>
                <MainRoute/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default MainLayout;
