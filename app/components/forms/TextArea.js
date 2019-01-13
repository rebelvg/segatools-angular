import React from 'react';
import { TextArea } from 'semantic-ui-react';

const TextAreaRaw = ({ input }) => <TextArea {...input}> {input.value} </TextArea>;

export default TextAreaRaw;
