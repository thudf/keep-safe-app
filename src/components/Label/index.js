import React from 'react';

import { LabelContainer, LabelText } from './styles';

const Label = ({ label, textAlign = null }) => {
  return (
    <LabelContainer textAlign={textAlign}>
      <LabelText>{label}</LabelText>
    </LabelContainer>
  );
}

export default Label;