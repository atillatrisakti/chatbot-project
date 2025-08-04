import React from 'react';
import SendIcon from '../../assets/icons/SendIcon';
import AttachIcon from '../../assets/icons/AttachIcon';
import AudioIcon from '../../assets/icons/AudioIcon';

const icons = {
  send: SendIcon,
  attach: AttachIcon,
  audio: AudioIcon,
};

const Icon = ({ name, color, size }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent color={color} size={size} /> : null;
};

export default Icon;
