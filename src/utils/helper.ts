type CampaignStatus = 'Coming' | 'Ongoing' | 'End';

export const getCampaignStatus = (start: number, end: number): CampaignStatus => {
  const currentTime = Date.now();
  if (currentTime < start) {
    return 'Coming';
  } else if (currentTime >= start && currentTime <= end) {
    return 'Ongoing';
  } else {
    return 'End';
  }
};

export const warningMessage = {
  "Coming": "Campaign not started yet!",
  "End": "Campaign ended."
}

export const revealWarnMessage = {
  "Coming": "Reveal not started yet!",
  "End": "Reveal period ended."
}

export const formatWalletAddress = (address: string) => {
  if (address.length < 10) {
    return address;
  }
  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-5);
  return `${firstPart}....${lastPart}`;
}

export const compaignStatus = (start: number, end: number) => {
  const currentTime = Date.now();

  if (currentTime < start) {
    return timestampToDate(start, "Start")
  } else {
    return timestampToDate(end, "End")
  }
};

export const timestampToDate = (timestamp: number, _status: string) => {
  const status = {
    state: "",
    time: ""
  }
  const date = new Date(+timestamp);
  status.state = _status
  status.time = date.toDateString()
  return status
}