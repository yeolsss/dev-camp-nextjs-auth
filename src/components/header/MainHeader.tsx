import ThemeButton from "@/components/themeButton";
import AuthLinkGroup from "@/components/header/linkGroup";
import { HeaderTitle } from "@/components/header/title";

function MainHeader() {
  return (
    <header className="flex justify-between mt-5 mx-5 items-center">
      <HeaderTitle titleName={"SpartaCodingClub"} />
      <section className="flex gap-5">
        <AuthLinkGroup />
        <ThemeButton />
      </section>
    </header>
  );
}

export default MainHeader;
