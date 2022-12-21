export interface savedLink {
  link: string;
  phone: string;
  date: string;
}

export const saveLink = (
  link: string,
  phone: string,
  date: string,
) => {
  const savedLinks: savedLink[] | null = JSON.parse(
    window.localStorage.getItem('links') || 'null',
  );
  const linkToSave = {
    link,
    phone,
    date
  };

  const checkLink = savedLinks?.find((l) => l.link === link);
  if (checkLink) {
    return;
  }

  window.localStorage.setItem(
    'links',
    savedLinks
      ? JSON.stringify([...savedLinks, linkToSave])
      : JSON.stringify([linkToSave]),
  );
  
  return;
};

export const replaceLinks = (links: savedLink[]) => {
  window.localStorage.setItem(
    'links',
    JSON.stringify(links)
  );

  return;
};
