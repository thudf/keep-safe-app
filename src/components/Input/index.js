import React, {
  useRef,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';

import Label from '../Label';

import { Container, TextInput, Text, Icon, Error, ErrorText } from './styles';

const Input = (
  { 
    label, 
    icon, 
    containerStyle = {},
    padding = null,
    onChange, 
    onBlur, 
    value, 
    error,
    disabled = false,
    ...rest 
  },
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

  return (
    <>
      {label && <Label label={label} isFocused={isFocused} isErrored={!!error} />}

      <Container 
        style={containerStyle}
        isDisabled={disabled}
        isFocused={isFocused} 
        isErrored={!!error}
      >
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#566DE3' : '#666360'}
        />

        {!disabled && (
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
        )}

        {disabled && (
          <Text>{value}</Text>
        )}
      </Container>

      {!disabled && (
        <Error>
          {error && <ErrorText>{error}</ErrorText>}
        </Error>
      )}
    </>
  );
};

export default forwardRef(Input);