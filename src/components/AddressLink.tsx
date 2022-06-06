import { ExternalLinkIcon } from "@heroicons/react/solid";
import { Arbitrum, shortenIfAddress } from "@usedapp/core";

type AddressLinkProps = {
  address: string;
};

export default function AddressLink(props: AddressLinkProps) {
  const address = props.address.slice(0, 42);

  return (
    <a
      href={Arbitrum.getExplorerAddressLink(address)}
      className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{shortenIfAddress(address)}</p>
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
}
