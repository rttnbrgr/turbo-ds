import { Body, Heading } from "@repo/ui/components/ui/text";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/carousel";
import { Dialog, DialogContent } from "@repo/ui/components/ui/dialog";
import { useCallback, useState } from "react";
import { Asset } from "@repo/types";

// LEGZ TODO: The overlay experience / carousel is a bit rough still, I was finding it tricky to combine the dialog + carousel + fluid image combination for a variety of reasons. What I have now mostly works but isn't my ideal solution.

// LEGZ TODO:  I Don't have the thumbs yet should be able to customize this easily enough with embla carousel - what shadcn uses under the hood
// https://www.embla-carousel.com/examples/predefined/#thumbnails

export type AttachedImagesProps = {
  assets: Asset[];
};

export function AttachedImages({ assets }: AttachedImagesProps) {
  const [currentAsset, setCurrentAsset] = useState<number>();

  const handleSelectAsset = useCallback((id?: number) => {
    setCurrentAsset(id);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Dialog
        open={!!currentAsset}
        onOpenChange={() => handleSelectAsset(undefined)}
      >
        <Heading size="lg">Attached Images</Heading>

        {assets?.length ? (
          <>
            <Body>Click to enlarge</Body>
            <div className="flex gap-3">
              {assets?.map((asset) => (
                <Image
                  key={asset.id}
                  alt="Logo"
                  src={asset.src}
                  width={200}
                  height={150}
                  className="object-cover"
                  onClick={() => setCurrentAsset(asset.id)}
                />
              ))}
            </div>
            {currentAsset ? (
              <DialogContent className="w-[90vw] h-[90vh] max-w-none p-0 border-none rounded-sm">
                <Carousel
                  className="max-h-full  relative"
                  opts={{ startIndex: currentAsset - 1 }}
                >
                  <CarouselContent className="h-full">
                    {assets?.map((asset) => (
                      <CarouselItem
                        key={asset.id}
                        className="h-full overflow-hidden"
                      >
                        <Image
                          alt="Logo"
                          src={asset.src}
                          layout="responsive"
                          width={asset.width}
                          height={asset.height}
                          className="object-cover w-[90vw] h-[90vh] max-h-[90vh]"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </DialogContent>
            ) : null}
          </>
        ) : (
          <Body>No images attached</Body>
        )}
      </Dialog>
    </div>
  );
}
