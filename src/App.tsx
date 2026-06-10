import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/core/style.css";
import "./App.css";

function App() {
  return (
    <>
      <BlossomCarousel
        className="carousel"
        autoPlay={true}
        autoPlayInterval={2000}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <div className="slide" key={index}>
            <div className="card">
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    marginBottom: "0.4rem",
                  }}
                >
                  Featured card
                </div>
                <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>
                  Slide {index + 1}
                </div>
                <div
                  style={{ fontSize: "0.9rem", opacity: 0.78, fontWeight: 500 }}
                >
                  Smooth 3D scroll animation
                </div>
              </div>
            </div>
          </div>
        ))}
      </BlossomCarousel>
    </>
  );
}

export default App;
