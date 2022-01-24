import { Menu, Popover, Switch, Transition } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import classNames from "clsx";
import QueryLink from "./QueryLink";
import { useRouter } from "next/router";

const sortOptions = [
  { name: "Highest Price", value: "price" },
  { name: "Latest", value: "time" },
];

const SalesOnlySwitch = ({ salesOnly }: { salesOnly?: boolean }) => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(salesOnly ?? false);

  return (
    <Switch.Group>
      <div className="inline-flex items-center">
        <Switch.Label className="text-sm font-medium mr-3 passive">
          Sales Only
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={(checked) => {
            setEnabled(checked);
            router.replace(
              {
                pathname: router.pathname,
                query: {
                  ...router.query,
                  salesOnly: checked,
                },
              },
              undefined,
              { shallow: false }
            );
          }}
          className={`${
            enabled ? "bg-red-500" : "bg-gray-200"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } transition ease-in-out duration-200 inline-flex w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

const SortMenu = ({ sort }: { sort: string | string[] }) => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative z-20 inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200">
          Sort
          <ChevronDownIcon
            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute right-0 z-10 mt-2 w-48 rounded-md shadow-2xl bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => {
              const active = option.value === sort;
              return (
                <Menu.Item key={option.name}>
                  <QueryLink
                    href={{
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        activitySort: option.value,
                      },
                    }}
                    // passHref
                    className={classNames(
                      "block px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-500",
                      {
                        "text-red-500 dark:text-gray-100": active,
                      }
                    )}
                  >
                    <span>{option.name}</span>
                  </QueryLink>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const ActivityActions = ({
  sort,
  salesOnly,
}: {
  sort: string | string[];
  salesOnly?: boolean;
}) => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="hidden md:flex">
        <section aria-labelledby="sales-only-switch" className="md:mr-5">
          <SalesOnlySwitch salesOnly={salesOnly} />
        </section>
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex justify-end md:items-center">
            <SortMenu sort={sort} />
          </div>
        </section>
      </div>
      <div className="inline-flex self-center md:hidden">
        <Popover className="relative">
          {() => (
            <>
              <Popover.Button className="inline-flex items-center">
                <FilterIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="origin-top-left absolute right-0 z-10 mt-2 w-[50vw] rounded-md shadow-2xl bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4 bg-white">
                      {sortOptions.map((option) => {
                        const active = option.value === sort;
                        return (
                          <QueryLink
                            key={option.name}
                            href={{
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                activitySort: option.value,
                              },
                            }}
                            // passHref
                            className={classNames(
                              "block py-2 text-sm font-medium text-gray-900 dark:text-gray-500",
                              {
                                "text-red-500 dark:text-gray-100": active,
                              }
                            )}
                          >
                            <span>{option.name}</span>
                          </QueryLink>
                        );
                      })}
                    </div>
                    <div className="p-4 bg-gray-50 items-center">
                      <SalesOnlySwitch salesOnly={salesOnly} />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </Fragment>
  );
};

export default ActivityActions;
