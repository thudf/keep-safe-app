import React, {
  useRef,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';

import { Container, TextInput, Icon, Error, ErrorText } from './styles';

const Input = (
  { icon, containerStyle = {}, onChange, onBlur, value, error, ...rest },
  ref,
) => {
  const inputElementRef = useRef(null);
  const inputValueRef = useRef({ value: "" });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    onBlur()
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    inputValueRef.current.value = value
  }, [value])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    console.log('ERROR: ', error)
  }, [error])

  return (
    <>
      <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#566DE3' : '#666360'}
        />

        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          defaultValue={''}
          value={value}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={onChange}
          {...rest}
        />
      </Container>
      <Error>
        {error && <ErrorText>{error}</ErrorText>}
      </Error>
    </>
  );
};

export default forwardRef(Input);