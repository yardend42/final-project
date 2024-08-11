import { useEffect, useState } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import "./vacationReports.css";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Box, Button, Container } from "@mui/material";

const { CanvasJSChart } = CanvasJSReact;

const VacationReports = (): JSX.Element => {
  const [dataPoints, setDataPoints] = useState<{ label: string; y: number }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/reports/followersReport"
        );
        const transformedData = response.data.map((item: any) => ({
          label: item.destination,
          y: Math.round(item.followers_count),
        }));
        setDataPoints(transformedData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchData();
  }, []);

  const options = {
    title: {
      text: "Vacation Followers Report",
    },
    axisY: {
      interval: 1,
      includeZero: true,
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };

  const handleDownloadCSV = (filename: string) => {
    const csvData = dataPoints.map((point) => ({
      destination: point.label,
      followers: point.y,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  };

  return (
    <Container className="vacationReports">
      <Box>
        <CanvasJSChart options={options} />
      </Box>
      <Box sx={{ textAlign: "center", margin: "20px 0" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDownloadCSV("vacation_followers_report.txt")}
        >
          Create CSV as text
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            handleDownloadCSV("vacation_followers_report_for_excel.csv")
          }
          sx={{ ml: 2 }}
        >
          Open with Excel
        </Button>
      </Box>
    </Container>
  );
};

export default VacationReports;
