import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import GallerySection from '../sections/GallerySection'

export default function Gallery() {
  return (
    <div>
      <Navbar />
      <main id="main-content">
        <GallerySection />
      </main>
      <Footer />
    </div>
  )
}
