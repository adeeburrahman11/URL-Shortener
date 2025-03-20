import { UrlState } from "@/Context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useState } from "react";
import * as yup from "yup";

const CreateLink = () => {
  const { user } = UrlState();

  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogTrigger>
          <Button variant="outline" className="bg-blue-500">
            Create New Link
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          <Error message={"some error"} />
          <Input
            id="title"
            placeholder="Enter your Long URL"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          <Error message={"some error"} />
          <div className="flex items-center gap-2">
            <Card className="p-2">linkzap.ar</Card> /
            <Input
              id="title"
              placeholder="Custom Link (Optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          <Error message={"some error"} />
          <DialogFooter className="sm:justify-start">
            <Button variant="destructive" className="bg-blue-500">
              Create Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
