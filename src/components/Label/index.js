import React from 'react';

import { LabelContainer, LabelText } from './styles';

const Label = ({ label, textAlign = null, isFocused, isErrored }) => {
  return (
    <LabelContainer textAlign={textAlign}>
      <LabelText isFocused={isFocused} isErrored={isErrored}>
        {label}
      </LabelText>
    </LabelContainer>
  );
}

export default Label;