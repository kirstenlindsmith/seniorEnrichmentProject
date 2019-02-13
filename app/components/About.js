import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <span>
        This page was created by{' '}
        <a href="https://github.com/kirstenlindsmith">Kirsten Lindsmith</a> for
        demonstration purposes.<br /> Please feel free to{' '}
        <a href="mailto:kirstenlindsmith@gmail.com">reach out</a> with any
        questions!
      </span>
      <br />
      <img src="https://i.imgur.com/LlpyVmB.png" id="aboutImage" />
    </div>
  );
};

export default About;
