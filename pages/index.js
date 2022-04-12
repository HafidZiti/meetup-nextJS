import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import LoadMore from "../components/LoadMore";
import { useState } from "react";

const limit = 2;

function HomePage(props) {
  const [meetups, setMeetups] = useState(props.meetups);
  const [loading, setLoading] = useState(false);
  const [isMax, setIsMax] = useState(props.meetups.length < limit);

  const clickHandle = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/meetups?skip=${meetups.length}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const retrievedMeetups = data.meetups;
    setMeetups((meetups) => [...meetups, ...retrievedMeetups]);
    setLoading(false);
    if (retrievedMeetups.length < limit) setIsMax(true);
  };

  return (
    <>
      <Head>
        <title>NEXT.js meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active NEXT.js meetups"
        />
      </Head>
      <MeetupList meetups={meetups} />
      {!isMax && <LoadMore onClick={clickHandle} isLoading={loading} />}
    </>
  );
}

/**
 * SSR: Server Side Rendering
 */
export async function getServerSideProps() {
  return await fetchMeetupList(limit);
}

/**
 * Fetch list of the meetups from the database
 * @param {number} skip
 * @param {number} limit
 * @returns
 */
const fetchMeetupList = async (limit, skip = 0) => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtweq.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
};

/**
 * SSG: Static Site generation
 */
/*
export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtweq.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
*/

export default HomePage;
