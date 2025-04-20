"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  InputAdornment,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function Step2BankAccountSetup() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [branch, setBranch] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleBankChange = (event) => {
    setBankName(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    let formattedAccountNumber = event.target.value.replace(/[^\d]/g, "");
    if (formattedAccountNumber.length > 10) {
      formattedAccountNumber = formattedAccountNumber.substring(0, 10);
    }
    setAccountNumber(formattedAccountNumber);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleSubmit = () => {
    if (!bankName || !accountNumber || !accountType) {
      setIsFormValid(false);
      return;
    }
    console.log("Form Submitted!");
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6">Bank Account Information</Typography>
      <Typography variant="body2" color="text.secondary">
        Connect your bank account to receive payments
      </Typography>

      <Stack spacing={2}>
        {/* Bank Name Dropdown */}
        <FormControl fullWidth error={!isFormValid && !bankName}>
          <TextField
            label="Bank Name"
            value={bankName}
            onChange={handleBankChange}
            variant="outlined"
            select
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon
                    color={bankName ? "primary" : "inherit"}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="Bangkok Bank">Bangkok Bank</MenuItem>
            <MenuItem value="Siam Commercial Bank">
              Siam Commercial Bank
            </MenuItem>
            <MenuItem value="Kasikorn Bank">Kasikorn Bank</MenuItem>
            <MenuItem value="Krungthai Bank">Krungthai Bank</MenuItem>
            <MenuItem value="Thai Military Bank">Thai Military Bank</MenuItem>
          </TextField>
          {!isFormValid && !bankName && (
            <FormHelperText sx={{ ml: 1.5 }}>
              Please select your bank
            </FormHelperText>
          )}
        </FormControl>

        {/* Account Number */}
        <FormControl fullWidth error={!isFormValid && !accountNumber}>
          <TextField
            label="Account Number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            variant="outlined"
            size="small"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon
                    color={accountNumber ? "primary" : "inherit"}
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          {!isFormValid && !accountNumber && (
            <FormHelperText sx={{ ml: 1.5 }}>
              Please enter your account number
            </FormHelperText>
          )}
        </FormControl>

        {/* Account Type */}
        <FormControl fullWidth error={!isFormValid && !accountType}>
          <TextField
            label="Account Type"
            value={accountType}
            onChange={handleAccountTypeChange}
            variant="outlined"
            select
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon color={accountType ? "primary" : "inherit"} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="Savings">Savings Account</MenuItem>
            <MenuItem value="Current">Current Account</MenuItem>
          </TextField>
          {!isFormValid && !accountType && (
            <FormHelperText sx={{ ml: 1.5 }}>
              Please select account type
            </FormHelperText>
          )}
        </FormControl>

        {/* Branch Name */}
        <FormControl fullWidth>
          <TextField
            label="Branch (Optional)"
            value={branch}
            onChange={handleBranchChange}
            variant="outlined"
            size="small"
            placeholder="Main Branch, Bangkok"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon color={branch ? "primary" : "inherit"} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="medium"
          onClick={handleSubmit}
          sx={{
            mt: 1,
            py: 1.5,
            borderRadius: 2,
            fontSize: 15,
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
            },
          }}
        >
          Save Bank Details
        </Button>
      </Stack>
    </Box>
  );
}
