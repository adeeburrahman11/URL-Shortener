import { Button } from "@/components/ui/button";
import { UrlState } from "@/Context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import UseFetch from "@/hooks/UseFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/LocationStats";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {
  // const linkzap = "https://linkzap.ar/";
  const linkzap = import.meta.env.VERCEL_URL;

  const downloadImage = () => {
    const imgUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imgUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn: fnUrl,
    error,
  } = UseFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = UseFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = UseFetch(deleteUrl, id);

  useEffect(() => {
    fnUrl();
    fnStats();
  }, []);

  // useEffect(() => {}, [url, user]);

  useEffect(() => {
    if (error) {
      navigate("/dashboard");
    }
  }, [error, navigate]);

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#51a2ff" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline"
            href={`https://url-shortener-lovat-phi.vercel.app/${link}`}
            target="_blank"
          >
            https://url-shortener-lovat-phi.vercel.app/{link}
          </a>
          <a
            className="flex items-center gap-1 hover:underline cursor-pointer"
            href={url?.original_url}
            target="_blank"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${linkzap}${
                    url?.custom_url ? url?.custom_url : url?.short_url
                  }`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button variant="ghost" onClick={() => fnDelete()}>
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="QR Code"
            className="w-full self-center sm:self-start ring-blue-500 p-1 object-contain"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location data</CardTitle>
              <LocationStats stats={stats}></LocationStats>
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats}></DeviceStats>
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Stats yet"
                : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
