import React from 'react';
import { Section } from 'styles/SharedStyle';

const Write = () => {
  return (
    <Section>
      <div>
        <form>
          제목 <input type="text" />
          내용 <textarea name="" id="" cols="30" rows="10"></textarea>
        </form>
      </div>
    </Section>
  );
};

export default Write;
