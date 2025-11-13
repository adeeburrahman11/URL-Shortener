import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The Fast and Reliable URL Shortening
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your loooooooonnng URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 p-4"
        />
        <Button className="h-full bg-blue-500" type="submit" variant="outline">
          Shorten!
        </Button>
      </form>
      <img src="/banner.png" alt="banner" className="w-full my-11 md:px-11" />
      <Accordion type="multiple" collapsible="true" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I shorten a URL?</AccordionTrigger>
          <AccordionContent>
            Simply paste your long URL in the input field above and click
            &quot;Shorten!&quot; You&apos;ll be redirected to sign up or log in
            if you haven&apos;t already. Once signed in, your shortened URL will
            be generated instantly and you can start sharing it right away.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Can I track clicks on my shortened links?
          </AccordionTrigger>
          <AccordionContent>
            Yes! Our dashboard provides detailed analytics for each link,
            including total clicks, device information (mobile, desktop,
            tablet), geographic location data, and click history over time. Log
            in to your dashboard to view real-time analytics for all your
            shortened URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Do I need an account to use this service?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you&apos;ll need to create a free account to shorten URLs and
            access your dashboard. This allows us to store your links securely,
            track analytics, and provide you with personalized statistics. Sign
            up takes just a minute!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I customize my short URL?</AccordionTrigger>
          <AccordionContent>
            Yes! When creating a new shortened link, you can choose to either
            let us generate a random short code or provide your own custom short
            code (subject to availability). Custom codes make your links more
            memorable and branded.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Is there a QR code for my links?</AccordionTrigger>
          <AccordionContent>
            Absolutely! Each shortened link comes with an automatically
            generated QR code that you can download and share. QR codes are
            perfect for print materials, posters, and offline marketing
            campaigns.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
