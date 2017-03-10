import styled from 'styled-components/native';


const Tags = styled.ScrollView`
  padding: 3 8 18;
  flex: 0;
  min-height: 45;
  margin-bottom: 5;
`;

Tags.defaultProps = {
  horizontal: true,
  contentContainerStyle: {
    // height: 45,
    flex: -1,
  },
};

export default Tags;
