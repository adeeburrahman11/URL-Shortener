import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PulseLoader } from "react-spinners";
import Error from "./Error";
import { useState } from "react";
import * as Yup from "yup";
import UseFetch from "@/hooks/UseFetch";
import { signup } from "@/db/apiAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignup } = UseFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is Required"),
        profile_pic: Yup.mixed().required("Profile picture is Required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await fnSignup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&apos;t already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            name="name"
            type="name"
            placeholder="Enter Name"
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            name="email"
            type="email"
            placeholder="Enter Email"
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            name="profile_pic"
            type="file"
            accept="image/*"
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? (
            <PulseLoader size={10} color="#51a2ff" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
