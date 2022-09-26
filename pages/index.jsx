/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import { auth } from "../firebase";

const Home = () => {
  const [user] = useAuthState(auth);

  if (!user) return <Login />;

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
        />
      </Head>

      <Header />
      <Feed />
    </div>
  );
};

export default Home;