"use client";
import styles from "./lading.module.css";
import { redirect } from "next/navigation";
export default function Page() {
  const handleRedirect = () => {
    redirect("/signup");
  };
  return (
    <div className={styles.container}>
      <h1>Trail Metrics</h1>
      <h6>Tune, Test, Track</h6>
      <div className={styles.gridContainer}>
        <div className={styles.textA}>
          <p>
            [Trail Metrics is a specialized app for mountain bikers, designed to
            help you track and optimize your bike setup for every ride. It
            allows you to log and fine-tune settings like suspension, tire
            pressure, and gear adjustments, so you can find the perfect
            configuration for different trails and conditions.]
          </p>
        </div>
        <div className={styles.pictureA}>
          {" "}
          <img
            src="https://c02.purpledshub.com/uploads/sites/39/2023/08/GettyImages-1578492680-211ec04.jpg?w=1029&webp=1"
            alt=""
          />
        </div>
        <div className={styles.textA}>
          {" "}
          <img
            src="https://img.redbull.com/images/c_crop,w_5568,h_2784,x_0,y_444/c_auto,w_1200,h_630/f_auto,q_auto/redbullcom/2018/07/10/4f0eb2e5-f6fa-4ca6-98ff-29a0701516ea/mtb-collection"
            alt=""
          />
        </div>
        <div className={styles.pictureB}>
          <p>
            [Setup Tracking – Log and refine every detail of your bike’s
            configuration to find the perfect setup for any terrain.
            Performance]
          </p>
          <p>
            [Analytics – Compare ride data across different setups and
            conditions to understand what works best for speed, control, and
            endurance.]
          </p>
          <p>
            [Track Insights – Store and analyze trail specific data, helping you
            prepare for every twist, turn, and climb with precision. Custom
            Ride]
          </p>
          <p>
            [Optimization – Fine-tune your settings based on real performance
            metrics to push your limits and achieve new personal bests. Whether
            you're a weekend warrior or a competitive racer, Trail Metrics
            empowers you with the tools to maximize performance and master every
            ride]
          </p>
        </div>
        <div className={styles.textB}></div>
        <div className={styles.pictureC}>
          <img
            src="https://www.vmcdn.ca/f/files/squamishchief/images/sports/hardlinetas24_m3_1849.JPG;w=960"
            alt=""
          />
        </div>
      </div>
      <button onClick={handleRedirect}> Register</button>
    </div>
  );
}
