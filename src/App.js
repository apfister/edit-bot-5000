import {
  CalciteActionPad,
  CalciteButton,
  CalciteIcon,
  CalciteLabel,
  CalciteNotice,
  CalciteRadioGroup,
  CalciteRadioGroupItem,
  CalciteTooltip,
  CalciteTooltipManager,
} from "@esri/calcite-components-react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Col, Container, Nav, Row } from "react-bootstrap";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import scripts from "./code-samples/scripts.js";
// import supportedLanguages from "react-syntax-highlighter/dist/esm/languages/hljs/supported-languages";

const StyledNav = styled(Nav)`
  background-color: #f8f8f8;
  border-bottom: 1px solid #eaeaea;
`;
const StyledNavTitle = styled.h1`
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 10px;
  flex: 1;
  font-weight: 400;
`;

const StyledCodeRow = styled(Row)`
  background-color: #f8f8f8;
  border-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 6px 20px -4px,
    rgb(0 0 0 / 8%) 0px 4px 12px -2px;
`;

const StyledDropDownContainer = styled.div`
  z-index: 5;
  position: absolute;
  right: 60px;
  top: 10px;
`;

const StyledActionPad = styled(CalciteActionPad)`
  z-index: 5;
  position: absolute;
  right: 10px;
  top: 10px;
`;

function App() {
  const codeSampleLanguages = [
    { name: "python", label: "Python" },
    { name: "javascript", label: "JavaScript" },
    { name: "rest", label: "REST API", modifier: "the" },
    { name: "java", label: "Java" },
    { name: "csharp", label: "C#" },
  ];

  const addFormats = [
    { name: "json", label: "JSON" },
    { name: "geojson", label: "GeoJSON", modifier: "file" },
    { name: "fc", label: "Feature Collection" },
    { name: "excel", label: "Excel", modifier: "file" },
    { name: "csv", label: "CSV", modifier: "file" },
    { name: "fgdb", label: "FileGDB" },
    { name: "shp", label: "Shapefile" },
  ];

  const [currentOp, setCurrentOp] = useState("add");
  const [currentFormat, setCurrentFormat] = useState("fc");
  // const [currentMethod, setCurrentMethod] = useState("append");
  const [activeScript, setActiveScript] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("python");
  // const [currentDeleteMethod, setCurrentDeleteMethod] = useState("delete");
  const [currentAddNumFeatures, setCurrentAddNumFeatures] = useState("lt250");

  useEffect(() => {
    let activeScript = null;
    if (
      currentOp === "add" &&
      currentFormat !== "fgdb" &&
      currentFormat !== "fc"
    ) {
      activeScript = `${currentOp}-${currentFormat}-${currentAddNumFeatures}`;
    } else if (currentOp === "add") {
      activeScript = `${currentOp}-${currentFormat}`;
    } else {
      activeScript = `${currentOp}-${currentAddNumFeatures}`;
    }
    activeScript = `${activeScript}-${activeLanguage}`;
    console.log(activeScript);
    setActiveScript(scripts[activeScript]);
  }, [currentOp, currentFormat, currentAddNumFeatures, activeLanguage]);

  const [currentTheme, setCurrentTheme] = useState("light");

  // const handleDarkMode = () => {
  //   setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  // };

  const getCurrentTheme = () => {
    return currentTheme === "dark"
      ? "calcite-theme-dark"
      : "calcite-theme-light";
  };

  const shouldShowLtGtFeatures = () => {
    if (
      currentOp === "add" &&
      currentFormat !== "fgdb" &&
      currentFormat !== "fc" &&
      currentFormat !== "excel"
    ) {
      return true;
    }
    if (currentOp === "delete") {
      return true;
    }
    return false;
  };

  const getNoSamplesFound = () => {
    let msg = "No samples are yet available for";
    if (currentOp === "add") {
      const first = currentOp === "add" ? "adding" : "deleting";
      const second = addFormats.filter((f) => f.name === currentFormat)[0];
      if (second.modifier) {
        msg = `${msg} ${first} a ${second.label} ${second.modifier} `;
      } else {
        msg = `${msg} ${first} a ${second.label} `;
      }

      const third = codeSampleLanguages.filter(
        (f) => f.name === activeLanguage
      )[0];

      if (third.modifier) {
        msg = `${msg} in ${third.modifier} ${third.label}`;
      } else {
        msg = `${msg} in ${third.label}`;
      }
    }
    return msg;
  };

  return (
    <Container fluid>
      <StyledNav>
        <StyledNavTitle>
          <CalciteIcon icon="calculator"></CalciteIcon> Edit Bot 5000
        </StyledNavTitle>
        {/* <StyledDarkModeLabelContainer layout="inline">
          <label>Dark mode</label>
          <CalciteSwitch
            onCalciteSwitchChange={handleDarkMode}
            className="float-xl-end"
          ></CalciteSwitch>
        </StyledDarkModeLabelContainer> */}
      </StyledNav>
      <Container fluid className="mt-3">
        <Row>
          <Col className="d-flex align-items-center" xs="4">
            <CalciteLabel className={getCurrentTheme()}>
              What would you like to do?
            </CalciteLabel>
          </Col>
          <Col>
            <CalciteRadioGroup
              onCalciteRadioGroupChange={(e) => setCurrentOp(e.detail)}
              scale="l"
              className={getCurrentTheme()}
            >
              <CalciteRadioGroupItem
                {...(currentOp === "add" ? { checked: true } : {})}
                value="add"
              >
                Add features
              </CalciteRadioGroupItem>
              <CalciteRadioGroupItem
                {...(currentOp === "delete" ? { checked: true } : {})}
                value="delete"
              >
                Delete features
              </CalciteRadioGroupItem>
            </CalciteRadioGroup>
          </Col>
        </Row>

        <Row className="mt-2">
          {
            currentOp === "add" ? (
              <>
                <Col className="d-flex align-items-center" xs="4">
                  <CalciteLabel className={getCurrentTheme()}>
                    What format is your data in?
                  </CalciteLabel>
                </Col>
                <Col>
                  <CalciteRadioGroup
                    onCalciteRadioGroupChange={(e) =>
                      setCurrentFormat(e.detail)
                    }
                    scale="l"
                    className={getCurrentTheme()}
                  >
                    {addFormats.map((format) => {
                      return (
                        <CalciteRadioGroupItem
                          {...(currentFormat === format.name
                            ? { checked: true }
                            : {})}
                          value={format.name}
                        >
                          {format.label}
                        </CalciteRadioGroupItem>
                      );
                    })}
                  </CalciteRadioGroup>
                </Col>
              </>
            ) : null
            // (
            //   <>
            //     <Col className="d-flex align-items-center" xs="4">
            //       <CalciteLabel className={getCurrentTheme()}>
            //         Do you want to Delete or Truncate your data?
            //       </CalciteLabel>
            //     </Col>
            //     <Col>
            //       <CalciteRadioGroup
            //         onCalciteRadioGroupChange={(e) =>
            //           setCurrentDeleteMethod(e.detail)
            //         }
            //         scale="l"
            //         className={getCurrentTheme()}
            //       >
            //         <CalciteRadioGroupItem
            //           {...(currentDeleteMethod === "delete"
            //             ? { checked: true }
            //             : {})}
            //           value="delete"
            //         >
            //           Delete
            //         </CalciteRadioGroupItem>
            //         <CalciteRadioGroupItem
            //           {...(currentDeleteMethod === "truncate"
            //             ? { checked: true }
            //             : {})}
            //           value="truncate"
            //         >
            //           Truncate
            //         </CalciteRadioGroupItem>
            //       </CalciteRadioGroup>
            //     </Col>
            //   </>
            // )
          }
        </Row>

        {shouldShowLtGtFeatures() && (
          <Row className="mt-2">
            <Col className="d-flex align-items-center" xs="4">
              <CalciteLabel className={getCurrentTheme()}>
                How many features are you going to {currentOp}?
              </CalciteLabel>
            </Col>
            <Col>
              <CalciteRadioGroup
                onCalciteRadioGroupChange={(e) =>
                  setCurrentAddNumFeatures(e.detail)
                }
                scale="l"
                className={getCurrentTheme()}
              >
                <CalciteRadioGroupItem
                  {...(currentAddNumFeatures === "lt250"
                    ? { checked: true }
                    : {})}
                  value="lt250"
                >
                  &lt; 250
                </CalciteRadioGroupItem>
                <CalciteRadioGroupItem
                  {...(currentAddNumFeatures === "gt250"
                    ? { checked: true }
                    : {})}
                  value="gt250"
                >
                  &gt; 250
                </CalciteRadioGroupItem>
              </CalciteRadioGroup>
            </Col>
          </Row>
        )}

        <StyledCodeRow className="mt-3">
          <Col>
            <div style={{ position: "relative" }}>
              <StyledDropDownContainer>
                <CalciteRadioGroup
                  onCalciteRadioGroupChange={(e) => setActiveLanguage(e.detail)}
                  scale="m"
                  className={getCurrentTheme()}
                >
                  {codeSampleLanguages.map((lang) => {
                    return (
                      <CalciteRadioGroupItem
                        {...(activeLanguage === lang.name
                          ? { checked: true }
                          : {})}
                        value={lang.name}
                      >
                        {lang.label}
                      </CalciteRadioGroupItem>
                    );
                  })}
                </CalciteRadioGroup>
              </StyledDropDownContainer>
              <CalciteTooltipManager>
                <StyledActionPad expandDisabled className={getCurrentTheme()}>
                  <CopyToClipboard text={activeScript}>
                    <CalciteButton
                      id="calciteC2C"
                      appearance="outline"
                      color="blue"
                      scale="m"
                      iconStart="copy-to-clipboard"
                    ></CalciteButton>
                  </CopyToClipboard>
                </StyledActionPad>
                <CalciteTooltip
                  referenceElement="calciteC2C"
                  placement="bottom"
                >
                  Copy to Clipboard
                </CalciteTooltip>
              </CalciteTooltipManager>
            </div>

            {activeScript ? (
              <SyntaxHighlighter
                language="python"
                style={currentTheme === "light" ? a11yLight : a11yDark}
                showLineNumbers
                customStyle={{
                  lineHeight: "1.09",
                  //   fontSize: "1em",
                }}
                codeTagProps={{
                  style: {
                    lineHeight: "inherit",
                    fontSize: "12px",
                  },
                }}
              >
                {activeScript}
              </SyntaxHighlighter>
            ) : (
              <CalciteNotice active style={{ height: "100px" }}>
                <div slot="title">No Code Samples Found</div>
                <div slot="message">{getNoSamplesFound()}</div>
              </CalciteNotice>
            )}
          </Col>
        </StyledCodeRow>
      </Container>
    </Container>
  );
}

export default App;
