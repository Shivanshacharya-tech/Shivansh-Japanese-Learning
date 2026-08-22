import Navbar from "../components/Navbar";

function About({ onNavigate }) {
  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="about-page">
        <section className="about-intro">
          <span className="about-label">About the creator</span>
          <h1>Shivansh Nihon Learning</h1>
          <p>
            A Japanese learning project created by Shivansh Acharya to make
            Hiragana, Katakana, Kanji, vocabulary, grammar, and practice easier
            to explore.
          </p>
        </section>

        <section className="about-contact">
          <h2>Connect with me</h2>
          <a href="mailto:shivanshacharya52@gmail.com">
            <span>Email</span>
            shivanshacharya52@gmail.com
          </a>
          <a href="https://github.com/Shivanshacharya-tech" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            github.com/Shivanshacharya-tech
          </a>
          <a href="https://www.linkedin.com/in/shivansh-acharya-59131932a/" target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            linkedin.com/in/shivansh-acharya-59131932a
          </a>
        </section>
      </main>
    </>
  );
}

export default About;
