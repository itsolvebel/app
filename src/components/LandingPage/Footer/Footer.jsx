import BgLineAnimation from "@components/LandingPage/Banner/BgLineAnimation";
import FooterLogo from "@components/LandingPage/Footer/FooterLogo";
import FooterList from "@components/LandingPage/Footer/FooterList";
import "../style/components/footer/footer.css";
import BackgroundAnimationFooter from "@components/LandingPage/Footer/BackgroundAnimationFooter";
const Footer = () => {
    return (
        <div className="bg-slate-900 relative max-h-[700px] fixed-content overflow-hidden">
            <div className="absolute  -z-50 top-[100px] lg:top-[1px] w-[100%]">
                <BackgroundAnimationFooter />
            </div>
            <FooterLogo></FooterLogo>
            <FooterList></FooterList>
        </div>
    );
};
export default Footer;