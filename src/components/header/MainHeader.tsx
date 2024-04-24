import ThemeButton from "@/components/themeButton";
import HeaderTitle from "@/components/header/title";
import AuthLinkGroup from "@/components/header/linkGroup";

function MainHeader() {
  return (
    <header className="flex justify-between">
      <HeaderTitle />
      <section className="flex gap-5">
        <AuthLinkGroup />
        <ThemeButton />
      </section>
    </header>
  );
}

export default MainHeader;
