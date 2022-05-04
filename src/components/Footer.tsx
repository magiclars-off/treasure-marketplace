import { MailIcon } from "@heroicons/react/solid";
import { DiscordIcon, TreasureToolsIcon, TwitterIcon } from "./Icons";
import Toggle from "./Toggle";

const social = [
  {
    name: "Twitter",
    href: "https://twitter.com/Treasure_DAO",
    icon: TwitterIcon,
  },
  {
    name: "Discord",
    href: "https://discord.gg/treasuredao",
    icon: DiscordIcon,
  },
  {
    name: "Treasure Tools",
    href: "https://treasure.tools",
    icon: TreasureToolsIcon,
  },
];

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="footer">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex items-center justify-between">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon
                  className="sm:h-8 sm:w-8 w-6 h-6"
                  aria-hidden="true"
                />
              </a>
            ))}
            <a
              key="Mail"
              href="mailto:TreasureNFTProject@gmail.com"
              className="text-gray-400 hover:text-red-500"
            >
              <span className="sr-only">Mail</span>
              <MailIcon className="sm:h-8 sm:w-8 w-6 h-6" aria-hidden="true" />
            </a>
          </div>
          <Toggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
