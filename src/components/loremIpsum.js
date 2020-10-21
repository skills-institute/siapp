import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import styles from './componentStyles/loremIpsum.style';

const loremIpsumText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus quam in diam sagittis efficitur. Fusce at nisl ultricies, congue enim at, egestas orci. Morbi sed odio id lectus porta dictum nec quis nisl. Pellentesque tempor, lorem sit amet tempus gravida, est augue dignissim purus, vel blandit erat metus at est. Ut lacinia aliquam sem, sed gravida leo ultrices et. Vestibulum molestie ullamcorper elit, vel vehicula odio mollis eget. Sed venenatis justo quis enim eleifend blandit. Ut faucibus turpis id accumsan pretium. Sed sodales tellus et turpis faucibus dapibus. Sed fringilla ante eget elit convallis, nec pellentesque nisi pellentesque. Fusce est velit, sagittis eget pharetra at, sodales nec lorem. Quisque in laoreet lorem. Duis mauris sapien, vehicula eu vehicula ac, dignissim pretium nulla. Integer augue neque, tincidunt id tortor vitae, dapibus tincidunt risus. Phasellus a condimentum lacus. Maecenas semper quam ac malesuada faucibus. Pellentesque vel sem eget diam cursus lobortis. Morbi sed blandit dolor, at suscipit lorem. Nam magna eros, rhoncus ut tellus eu, ullamcorper imperdiet nisi. In ornare finibus dolor at viverra.Aenean fringilla a leo vitae facilisis. Aliquam sodales pharetra laoreet. In hac habitasse platea dictumst. In non venenatis diam. Praesent at lorem eu justo hendrerit aliquam vel vitae nibh. Nunc facilisis, mi non commodo sagittis, tellus nunc porttitor lacus, ac finibus purus nunc ac magna. Pellentesque condimentum commodo ornare. Aliquam erat volutpat. In mollis urna id mi accumsan tempor.Aenean id sagittis quam. Nam euismod lobortis orci sed pharetra. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas volutpat ex eu imperdiet aliquet. Donec quis lacus sagittis, malesuada ipsum quis, placerat tellus. Vestibulum arcu augue, tincidunt quis lacus at, iaculis finibus quam. Vivamus porta egestas convallis. Vivamus sit amet placerat erat, vitae porta eros. Curabitur eu tincidunt ex, vitae convallis urna. Sed nec cursus lacus, sed dignissim sapien.Cras eget laoreet risus. Duis tellus velit, feugiat non urna id, commodo finibus dui. Proin a fringilla lacus. Duis nec leo nec diam pulvinar auctor sit amet non libero. Suspendisse id turpis eget urna finibus suscipit eu vel nibh. Maecenas bibendum odio nec eros pellentesque, ut ullamcorper risus tempor. Phasellus mattis id velit at aliquam. Pellentesque gravida ultrices augue, sit amet finibus risus aliquet vitae. Vestibulum egestas tincidunt commodo. Nulla eget bibendum mauris, condimentum malesuada lacus.';

const propTypes = {
  size: PropTypes.number.isRequired,
};

// const defaultProps = {
//   size: 0,
// };

const LoremIpsum = (props) => {
  const {textStyle, viewStyle} = styles;
  const loremIpsumToRender = loremIpsumText.substring(0, props.size);
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{loremIpsumToRender}</Text>
    </View>
  );
};

LoremIpsum.propTypes = propTypes;
// loremIpsumText.defaultProps = defaultProps;

export default LoremIpsum;
