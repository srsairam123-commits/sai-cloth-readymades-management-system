import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import SummaryCard from "./SummaryCard";
import { getDashboardSummary } from "../../services/api";

function DashboardSummary() {

  const [summary, setSummary] = useState({
    todayReceived: 0,
    todaySent: 0,
    currentBalance: 0,
    totalTransactions: 0,
  });

  const [display, setDisplay] = useState({
    todayReceived: 0,
    todaySent: 0,
    currentBalance: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {

    animateValue("todayReceived", summary.todayReceived);
    animateValue("todaySent", summary.todaySent);
    animateValue("currentBalance", summary.currentBalance);
    animateValue("totalTransactions", summary.totalTransactions);

  }, [summary]);

  const loadDashboard = async () => {

    const response = await getDashboardSummary();

    if (response.success) {

      setSummary({
        todayReceived: Number(response.todayReceived || 0),
        todaySent: Number(response.todaySent || 0),
        currentBalance: Number(response.currentBalance || 0),
        totalTransactions: Number(response.totalTransactions || 0),
      });

    }

  };

  const animateValue = (key, endValue) => {

    let start = 0;

    const duration = 500;

    const stepTime = 10;

    const increment = endValue / (duration / stepTime);

    const timer = setInterval(() => {

      start += increment;

      if (start >= endValue) {

        start = endValue;

        clearInterval(timer);

      }

      setDisplay(prev => ({
        ...prev,
        [key]: Math.floor(start)
      }));

    }, stepTime);

  };

  return (

    <Grid container spacing={3} sx={{ mb: 3 }}>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          title="Today's Collection"
          value={`₹${display.todayReceived.toLocaleString("en-IN")}`}
          icon={<CurrencyRupeeIcon />}
          color="#16A34A"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          title="Today's Payment"
          value={`₹${display.todaySent.toLocaleString("en-IN")}`}
          icon={<PaymentsIcon />}
          color="#F97316"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          title="Current Balance"
          value={`₹${display.currentBalance.toLocaleString("en-IN")}`}
          icon={<AccountBalanceWalletIcon />}
          color="#2563EB"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          title="Transactions"
          value={display.totalTransactions.toLocaleString("en-IN")}
          icon={<ReceiptLongIcon />}
          color="#9333EA"
        />
      </Grid>

    </Grid>

  );

}

export default DashboardSummary;