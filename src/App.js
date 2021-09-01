import {
  CalciteActionPad,
  CalciteButton,
  CalciteIcon,
  CalciteLabel,
  CalciteNotice,
  CalciteRadioGroup,
  CalciteRadioGroupItem,
  CalciteShell,
  CalciteSwitch,
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
import { useLocation, useHistory, useParams } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import scripts from "./code-samples/scripts.js";
// import supportedLanguages from "react-syntax-highlighter/dist/esm/languages/hljs/supported-languages";

const StyledNav = styled(Nav)`
  // background-color: #f8f8f8;
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
  // background-color: #f8f8f8;
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
    { name: "python", label: "ArcGIS API for Python" },
    { name: "rest", label: "REST API (Python)", modifier: "the" },
    { name: "javascript", label: "JavaScript" },
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
  const [currentFormat, setCurrentFormat] = useState("json");
  const [currentScript, setCurrentScript] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("python");
  const [currentAddNumFeatures, setCurrentAddNumFeatures] = useState("lt250");
  const [c2cIcon, setC2cIcon] = useState("copy-to-clipboard");
  const [c2cText, setC2cText] = useState("Copy to Clipboard");
  const [isC2cOpen, setIsC2cOpen] = useState(false);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let params = new URLSearchParams(location.search);

    let check = "op";
    let checkValue = params.get(check);
    if (checkValue && ["add", "delete"].includes(checkValue)) {
      console.log("ya");
      setCurrentOp(checkValue);
    }

    check = "format";
    checkValue = params.get(check);
    if (checkValue && addFormats.map((f) => f.name).includes(checkValue)) {
      setCurrentFormat(checkValue);
    }

    check = "language";
    checkValue = params.get(check);
    if (
      checkValue &&
      codeSampleLanguages.map((f) => f.name).includes(checkValue)
    ) {
      setCurrentLanguage(checkValue);
    }

    check = "ltgt";
    checkValue = params.get(check);
    if (checkValue && ["lt250", "gt250"].includes(checkValue)) {
      setCurrentAddNumFeatures(checkValue);
    }
  }, []);

  useEffect(() => {
    let currentScript = null;
    if (
      currentOp === "add" &&
      currentFormat !== "fgdb" &&
      currentFormat !== "fc" &&
      currentFormat !== "excel" &&
      currentFormat !== "shp"
    ) {
      currentScript = `${currentOp}-${currentFormat}-${currentAddNumFeatures}`;
    } else if (currentOp === "add") {
      currentScript = `${currentOp}-${currentFormat}`;
    } else {
      currentScript = `${currentOp}-${currentAddNumFeatures}`;
    }
    currentScript = `${currentScript}-${currentLanguage}`;
    console.log(currentScript);
    setCurrentScript(scripts[currentScript]);
  }, [currentOp, currentFormat, currentAddNumFeatures, currentLanguage]);

  useEffect(() => {
    let params = new URLSearchParams();
    params.set("op", currentOp);
    params.set("format", currentFormat);
    params.set("language", currentLanguage);
    params.set("ltgt", currentAddNumFeatures);

    history.push({
      search: params.toString(),
    });
  }, [
    history,
    currentOp,
    currentFormat,
    currentAddNumFeatures,
    currentLanguage,
  ]);

  const [currentTheme, setCurrentTheme] = useState("light");

  const handleDarkMode = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

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
      currentFormat !== "excel" &&
      currentFormat !== "shp"
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
        (f) => f.name === currentLanguage
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
    <CalciteShell className={`calcite-theme-${currentTheme}`}>
      <Container fluid>
        <StyledNav className="align-items-center">
          <StyledNavTitle>
            <CalciteIcon icon="calculator"></CalciteIcon> Edit Bot 5000
          </StyledNavTitle>
          <CalciteLabel layout="inline">
            <label>Dark mode</label>
            <CalciteSwitch
              onCalciteSwitchChange={handleDarkMode}
              className="float-xl-end"
            ></CalciteSwitch>
          </CalciteLabel>
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
                    onCalciteRadioGroupChange={(e) =>
                      setCurrentLanguage(e.detail)
                    }
                    scale="m"
                    className={getCurrentTheme()}
                  >
                    {codeSampleLanguages.map((lang) => {
                      return (
                        <CalciteRadioGroupItem
                          {...(currentLanguage === lang.name
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
                    <CopyToClipboard text={currentScript}>
                      <CalciteButton
                        id="calciteC2C"
                        appearance="outline"
                        color="blue"
                        scale="m"
                        iconStart={c2cIcon}
                        onClick={() => {
                          setC2cIcon("check");
                          setC2cText("Copied!");
                          setIsC2cOpen(true);

                          setTimeout(() => {
                            setIsC2cOpen(false);
                            setC2cIcon("copy-to-clipboard");
                            setC2cText("Copy to Clipboard");
                          }, 2000);
                        }}
                      ></CalciteButton>
                    </CopyToClipboard>
                  </StyledActionPad>
                  <CalciteTooltip
                    referenceElement="calciteC2C"
                    open={isC2cOpen}
                    placement="bottom"
                  >
                    {c2cText}
                  </CalciteTooltip>
                </CalciteTooltipManager>
              </div>

              {currentScript ? (
                <SyntaxHighlighter
                  language={currentLanguage}
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
                  {currentScript}
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
    </CalciteShell>
  );
}

export default App;
