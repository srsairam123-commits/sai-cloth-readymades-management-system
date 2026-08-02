import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function SummaryCard({
  title,
  value,
  icon,
  color,
}) {

  return (

    <Card
      sx={{
        borderRadius: 4,
        height: 150,
        boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              color="text.secondary"
              fontSize={15}
            >
              {title}
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              mt={2}
              sx={{
                fontSize: 30,
                color: "#111827",
              }}
            >
              {value}
            </Typography>

          </Box>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: 28,
            }}
          >
            {icon}
          </Box>

        </Box>

      </CardContent>

    </Card>

  );

}

export default SummaryCard;