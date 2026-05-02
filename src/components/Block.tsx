interface BlockProps {
  children: React.ReactNode;
}

export const Block = ({ children }: BlockProps) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};