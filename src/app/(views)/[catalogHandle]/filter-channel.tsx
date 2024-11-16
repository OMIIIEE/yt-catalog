"use client";

import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/shadcn/avatar";
import { Button } from "~/components/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/shadcn/sheet";

export default function FilterChannel({
  activeChannels,
}: {
  activeChannels: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const channelId = params.get("channelId");

  const [selectedChannelId, setSelectedChannelId] = useState<string>("");

  const handleSelectionChange = (key: string) => {
    if (!key) {
      setSelectedChannelId(key);
      return;
    }

    setSelectedChannelId(key);

    if (key) {
      params.set("channelId", key);
    } else {
      params.delete("channelId");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleOnClear = () => {
    params.delete("channelId");

    replace(`${pathname}?${params.toString()}`);

    setSelectedChannelId("");
  };

  useEffect(() => {
    if (channelId) {
      setSelectedChannelId(channelId);
    }
  }, [channelId]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-9 px-4 lg:px-6">
          <Filter className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:inline">Filter Channel</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[280px] sm:w-[400px]">
        <SheetHeader className="text-left">
          <SheetTitle>Filter Channels</SheetTitle>
          <SheetDescription>
            Select a channel to filter the content
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {selectedChannelId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOnClear}
              className="w-full justify-start"
            >
              Clear filter
            </Button>
          )}
          <div className="flex flex-col space-y-2">
            {activeChannels.map((channel: any) => (
              <Button
                key={channel.id}
                variant={
                  channel.id === selectedChannelId ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleSelectionChange(channel.id)}
                className="justify-start"
              >
                {channel.title}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function CurrentActive({ activeChannels }: { activeChannels: any }) {
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const channelId = params.get("channelId");
  const [activeFilteredChannel, setActiveFilteredChannel] = useState<any>(null);

  useEffect(() => {
    if (channelId) {
      const filterChannel = activeChannels.find(
        (channel: any) => channel.id === channelId
      );

      setActiveFilteredChannel(filterChannel);
    } else {
      setActiveFilteredChannel(null);
    }
  }, [activeChannels, channelId]);

  if (activeFilteredChannel) {
    return (
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={activeFilteredChannel.logo}
            alt={activeFilteredChannel.title}
          />
          <AvatarFallback>{activeFilteredChannel.title}</AvatarFallback>
        </Avatar>
        <h4 className="text-2xl font-bold">{activeFilteredChannel.title}</h4>
      </div>
    );
  }

  return <></>;
}
