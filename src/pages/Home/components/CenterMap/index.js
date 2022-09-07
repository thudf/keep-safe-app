import { CenterMapButton, CenterMapContainer, CenterMapText } from './styles'

const CenterMap = ({ handleCenterMap }) => {
  return (
    <CenterMapContainer>
      <CenterMapButton
        activeOpacity={0.9}
        onPress={() => handleCenterMap()}
      >
        <CenterMapText>Centralizar</CenterMapText>
      </CenterMapButton>
    </CenterMapContainer>
  );
};

export default CenterMap;