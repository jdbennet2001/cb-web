# CB-Web

IOS Web App for cataloging / reading archives.

Leverage Redux and React with a model:

```
/* Full catalog structure */
{
  folders: {
    name: string
    directory: string
    folders: [ .. ]
  },
  /* Archives in currently selected folder */
  archives: [
    {
      name: string,
      length: int,
      directory: string,
      location: string
    }
  ]
}
```
