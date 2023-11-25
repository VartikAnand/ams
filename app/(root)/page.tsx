import { Button } from "@nextui-org/react";
import { Camera } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "/components/ThemeSwitch/ThemeSwitcher";
import { SunIcon } from "../../components/ThemeSwitch/sunIcon";
import { MoonIcon } from "../../components/ThemeSwitch/moonIcon";
export default function App() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button color="primary" variant="solid">
        <Camera /> Solid
      </Button>
      <Button color="primary" variant="faded">
        Faded
      </Button>
      <Button color="primary" variant="bordered">
        Bordered
      </Button>
      <Button color="primary" variant="light">
        Light
      </Button>
      <Button color="primary" variant="flat">
        Flat
      </Button>
      <Button color="primary" variant="ghost">
        Ghost
      </Button>
      <Button color="primary" variant="shadow">
        Shadow
      </Button>
      <UserButton afterSignOutUrl="/" />
      <ThemeSwitcher />
    </div>
  );
}
